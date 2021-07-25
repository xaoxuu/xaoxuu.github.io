---
date: 2017-06-22
updated: 2017-06-22
title: iOS 接入 Strava 分享模块（上篇：FitSDK）
categories: [解决方案]
tags: [iOS, FitSDK]
cover: workout,fit
references:
  - title: G.FIT_SDK_V4.04.00.zip
    url: https://developer.garmin.com/fit/?resources/fit/
  - url: https://github.com/xaoxuu/FitSDK
---

[fit](https://developer.garmin.com/fit/?resources/fit/) 是一种文件协议，体积小巧，多用于可穿戴设备记录、传输运动与健康数据。官方提供了 C、C++、Java 语言的 SDK 和非常详细的使用文档。因此在 iOS 端接入 fit 就需要在 C 或 C++ 的 SDK 基础上进行一点面向对象的封装。

<!-- more -->

## 认识 Fit

我使用的 C 语言的 SDK，官方有示例 demo，在 `fit_mgr` 文件中提供了一些示例，这些代码未必全部都要用到。创建一个最简单的 `.fit` 文件的流程是：


### 写 fileid

```c
void fit_transaction_file(FIT_FILE type, FIT_MANUFACTURER manufacturer, FIT_UINT16 product, FIT_UINT32Z serial_number){
    // Write file id message.
    FIT_UINT8 local_mesg_number = 0;
    FIT_FILE_ID_MESG file_id;
    Fit_InitMesg(fit_mesg_defs[FIT_MESG_FILE_ID], &file_id);

    // @xaoxuu: type FIT_FILE_ACTIVITY = 4 活动数据
    file_id.type = type;
    // @xaoxuu: 厂商
    file_id.manufacturer = manufacturer;
    // @xaoxuu: 产品
    //        file_id.product_name
    file_id.product = product;
    // @xaoxuu: 序列号
    file_id.serial_number = serial_number;
    // @xaoxuu: 生产日期
    //        time_t now;
    //        time(&now);
    //        file_id.time_created = now;

    WriteMessageDefinition(local_mesg_number, fit_mesg_defs[FIT_MESG_FILE_ID], FIT_FILE_ID_MESG_DEF_SIZE, static_fp);
    WriteMessage(local_mesg_number, &file_id, FIT_FILE_ID_MESG_SIZE, static_fp);
}

void fit_transaction_field_desc() {
    // Write a Field Description
    FIT_UINT8 local_mesg_number = 1;
    FIT_FIELD_DESCRIPTION_MESG field_description_mesg;

    Fit_InitMesg(fit_mesg_defs[FIT_MESG_FIELD_DESCRIPTION], &field_description_mesg);
    field_description_mesg.developer_data_index = 0;
    field_description_mesg.field_definition_number = 0;
    field_description_mesg.fit_base_type_id = FIT_BASE_TYPE_UINT16;
    WriteMessageDefinition(local_mesg_number, fit_mesg_defs[FIT_MESG_FIELD_DESCRIPTION], FIT_FIELD_DESCRIPTION_MESG_DEF_SIZE, static_fp);
    WriteMessage(local_mesg_number, &field_description_mesg, FIT_FIELD_DESCRIPTION_MESG_SIZE, static_fp);
}
```

### 写 record

```c
// 写入Record Defenition
void fit_transaction_record_def(){
    FIT_UINT8 local_mesg_number = 2;
    WriteMessageDefinition(local_mesg_number, fit_mesg_defs[FIT_MESG_RECORD], FIT_RECORD_MESG_DEF_SIZE, static_fp);
}
// 循环写入record数据
void fit_transaction_record_msg(unsigned int timestamp, int position_lat, int position_long, unsigned int distance, unsigned short altitude, unsigned short speed, unsigned char heart_rate){
    //Record message
    FIT_UINT8 local_mesg_number = 2;
    FIT_RECORD_MESG record;

    Fit_InitMesg(fit_mesg_defs[FIT_MESG_RECORD], &record);
    record.timestamp = timestamp;
    record.position_lat = position_lat;
    record.position_long = position_long;
    record.distance = distance;
    record.altitude = altitude;
    record.speed = speed;
    record.heart_rate = heart_rate;
    WriteMessage(local_mesg_number,&record,FIT_RECORD_MESG_SIZE,static_fp);
}
```



## 开始封装

### 设计模型

FitActivity.h

```objc
//
//  FitAcitvity.h
//  FitSDK
//
//  Created by xaoxuu on 04/07/2017.
//  Copyright © 2017 xaoxuu. All rights reserved.
//

#import <Foundation/Foundation.h>

@class FitActivityRecord;
typedef NS_ENUM(NSUInteger, FitActivityType) {
    FitActivityTypeWalk = 11, // 枚举值等于FIT_SPORT值
    FitActivityTypeRun = 1,
    FitActivityTypeRide = 2,
    FitActivityTypeSwim = 5,
    FitActivityTypeHike = 17,
};

@interface FitActivity : NSObject

// @xaoxuu: fit 文件路径
@property (copy, readonly, nonatomic) NSString *path;

// @xaoxuu: 活动名
@property (copy, nonatomic) NSString *name;

// @xaoxuu: 活动类型
@property (assign, nonatomic) FitActivityType type;

// @xaoxuu: 活动类型
@property (copy, readonly, nonatomic) NSString *typeString;

// @xaoxuu: records
@property (strong, nonatomic) NSMutableArray<FitActivityRecord *> *records;

/**
 添加一条record

 @param record record
 */
- (void)addRecord:(void (^)(FitActivityRecord *aRecord))record;

@end

@interface FitActivityRecord : NSObject

// @xaoxuu: timestamp
@property (assign, nonatomic) unsigned int timestamp;

// @xaoxuu: position_lat
@property (assign, nonatomic) int position_lat;

// @xaoxuu: position_long
@property (assign, nonatomic) int position_long;

// @xaoxuu: distance
@property (assign, nonatomic) unsigned int distance;

// @xaoxuu: altitude
@property (assign, nonatomic) unsigned short altitude;

// @xaoxuu: speed
@property (assign, nonatomic) unsigned short speed;

// @xaoxuu: heart_rate
@property (assign, nonatomic) unsigned char heart_rate;

@end
```

FitActivity.m

```objc
//
//  FitAcitvity.m
//  FitSDK
//
//  Created by xaoxuu on 04/07/2017.
//  Copyright © 2017 xaoxuu. All rights reserved.
//

#import "FitAcitvity.h"

@implementation FitActivity

- (instancetype)init {
    if (self = [super init]) {
        _records = [NSMutableArray array];
        self.type = FitActivityTypeWalk;
    }
    return self;
}


- (void)setType:(FitActivityType)type{
    _type = type;

    switch (type) {
        case FitActivityTypeWalk:
            _typeString = @"walk";
            break;
        case FitActivityTypeRun:
            _typeString = @"run";
            break;
        case FitActivityTypeRide:
            _typeString = @"ride";
            break;
        case FitActivityTypeSwim:
            _typeString = @"swim";
            break;
        case FitActivityTypeHike:
            _typeString = @"hike";
            break;

    }
}


- (void)setName:(NSString *)name{
    _name = name;
    _path = [self pathWithName:name];
}

- (void)addRecord:(void (^)(FitActivityRecord *aRecord))record{
    if (record) {
        FitActivityRecord *rec = [FitActivityRecord new];
        record(rec);
        [self.records addObject:rec];
    }
}

- (NSString *)pathWithName:(NSString *)name{
    NSString *path = [[NSTemporaryDirectory() stringByAppendingPathComponent:@"com.xaoxuu.fitsdk"] stringByAppendingPathComponent:name];
    path = [path stringByAppendingPathExtension:@"fit"];
    // create dir if not exist
    NSFileManager *fm = [NSFileManager defaultManager];
    NSString *dir = path.stringByDeletingLastPathComponent;
    BOOL result = [fm createDirectoryAtPath:dir withIntermediateDirectories:YES attributes:nil error:nil];
    if (!result) {
        NSLog(@"can not create the directory at path %@",dir);
    }
    return path;
}

@end

@implementation FitActivityRecord

- (instancetype)init{
    if (self = [super init]) {
        _timestamp = 702940946;
        _position_lat = 0;
        _position_long = 0;
        _distance = 0;
        _altitude = 0;
        _speed = 0;
        _heart_rate = 0;
    }
    return self;
}

@end
```



### 封装接口

FitSDK.h

```objc
//
//  FitSDK.h
//  FitSDK
//
//  Created by xaoxuu on 04/07/2017.
//  Copyright © 2017 xaoxuu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FitAcitvity.h"

@interface FitSDK : NSObject

/**
 创建一个活动数据fit文件

 @param activity 活动数据
 @return 活动数据模型
 */
+ (FitActivity *)createActivity:(void (^)(FitActivity *activity))activity;

@end

```

FitSDK.m

```objc
//
//  FitSDK.m
//  FitSDK
//
//  Created by xaoxuu on 04/07/2017.
//  Copyright © 2017 xaoxuu. All rights reserved.
//

#import "FitSDK.h"
#import "fit_mgr.h"

@implementation FitSDK

+ (FitActivity *)createActivity:(void (^)(FitActivity *activity))activity{
    FitActivity *act = [FitActivity new];
    if (activity) {
        activity(act);
    }
    [self createActivityWithModel:act];
    return act;
}


+ (void)createActivityWithModel:(FitActivity *)activity{
    // @xaoxuu: fit file
    const char *fp = [activity.path cStringUsingEncoding:NSUTF8StringEncoding];
    fit_transaction(fp, activity.type, ^{
        [activity.records enumerateObjectsUsingBlock:^(FitActivityRecord * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            fit_transaction_record_msg(obj.timestamp, obj.position_lat, obj.position_long, obj.distance, obj.altitude, obj.speed, obj.heart_rate);
        }];
    });
}

@end

```



## 使用

```objc
FitActivity *activity = [FitSDK createActivity:^(FitActivity *activity) {
    activity.name = @"test";
    activity.type = FitActivityTypeRun;
    for (int i = 0; i<100; i++) {
        [activity addRecord:^(FitActivityRecord *aRecord) {
            aRecord.timestamp = [[NSDate date] timeIntervalSince1970] - 631065600;
            aRecord.position_lat = 495280430+i*1000;
            aRecord.position_long = -872696681-i*1500;
            aRecord.distance = 2+i/100;
            aRecord.altitude = 287.2+i;
            aRecord.speed = 0.29+i/50;
            aRecord.heart_rate = 68+i/4;
        }];
    }
}];
// activity.path就是生成的fit文件路径
NSLog(@"%@", activity.path);
```
