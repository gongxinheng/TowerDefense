 //
//  SPAppDelegate.m
//  SweetPomeTest_HitMouse
//
//  Created by kusu on 12-6-6.
//  Copyright (c) 2012Äê __MyCompanyName__. All rights reserved.
//

#include "AppDelegate.h"
#include "SPGameWin32.h"


USING_NS_CC;

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    //SimpleAudioEngine::end();
}

bool AppDelegate::applicationDidFinishLaunching()
{
	printf("casacasc");
	Sweetpome::GameWorldStart( "main.js",640, 960 );
	printf("vvxcxvc");

	//std::string str = "main.js";
	//std::string jsPath = cocos2d::CCFileUtils::sharedFileUtils()->fullPathFromRelativePath(str.c_str()) ;
	//SP_JSBind::CJSManager::Instance()->ExecuteScriptFromFile(jsPath.c_str());
    return true;
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    //CCDirector::sharedDirector()->pause();

    //SimpleAudioEngine::sharedEngine()->pauseBackgroundMusic();
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
//    CCDirector::sharedDirector()->resume();
//
//    SimpleAudioEngine::sharedEngine()->resumeBackgroundMusic();
}
