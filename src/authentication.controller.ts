import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    Header,
    HttpStatus,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Readable } from "stream";
import { PassThrough, Writable } from "stream";
import * as fs from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import * as streamifier from "streamifier";
import * as FfmpegCommand from "fluent-ffmpeg";

@Controller("authenticate")
export class AuthenticationController {

}