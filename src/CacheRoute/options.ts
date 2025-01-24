import { APIResponse, Request, Route } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type CacheRouteOptions = {
  /* Base directory for cache files */
  baseDir?: string;
  /* Extra directory for cache files */
  extraDir?: string | string[] | ((req: Request) => string | string[]);
  /* Additional matching function for request */
  match?: (req: Request) => boolean | void;
  /* Match responses with particular HTTP status */
  httpStatus?: number | number[];
  /* Cache time to live (in minutest) */
  ttlMinutes?: number;
  /* Request overrides when making real call */
  overrides?: RequestOverrides | ((req: Request) => RequestOverrides);
  /* Modify response for test */
  modify?: (route: Route, response: APIResponse) => Promise<unknown>;
  /* Modify JSON response (helper) */
  modifyJSON?: (json: any) => any;
  /* Disable caching, always request from server */
  noCache?: boolean;
  /* Disable caching, always request from server and update cached files */
  forceUpdate?: boolean;
  /** Function to build cache dir for fine-grained control */
  buildCacheDir?: (ctx: BuildCacheDirArg) => (string | string[] | number | number[] | undefined)[];
};

export type BuildCacheDirArg = {
  hostname: string;
  pathname: string;
  httpMethod: string;
  extraDir?: string[];
  httpStatus?: string;
  req: Request;
};

type RequestOverrides = Parameters<Route['fetch']>[0];
