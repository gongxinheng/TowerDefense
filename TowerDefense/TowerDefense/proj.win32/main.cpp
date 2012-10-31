#include "main.h"
#include "AppDelegate.h"
#include "CCEGLView.h"
#include <stdio.h>

USING_NS_CC;

// uncomment below line, open debug console
// #define USE_WIN32_CONSOLE

static AppDelegate s_sharedApplication;

int APIENTRY _tWinMain(HINSTANCE hInstance,
                       HINSTANCE hPrevInstance,
                       LPTSTR    lpCmdLine,
                       int       nCmdShow)
{
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);

	AllocConsole();
	freopen("CONOUT$", "w", stdout);

    int ret = CCApplication::sharedApplication()->run();

	FreeConsole();
    return ret;
}
