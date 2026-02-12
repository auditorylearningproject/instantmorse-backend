# Response Time–Based Auditory Learning — Backend

Server-side application for a web-based Morse code training platform
that measures response time between audio playback and spoken user
response. The system is designed to support “instant recognition”
training, where users verbally identify Morse characters immediately
after hearing them.

This project was developed for Dr. John Rogers (Mechanical Engineering)
as part of CSCI-4930.

## Problem Statement

Traditional Morse code learning platforms (e.g., LCWO.net) rely on typed
responses. This introduces a bottleneck: typing speed limits the ability
to measure how quickly a user can recognize Morse characters.

#### The goal of this system is to: 
- Play Morse code audio for a given character or phrase 
- Record the user’s spoken response
- Measure the time between playback completion and the start of speech 
- Determine whether the spoken response is correct (in-browser APIs with server fallback processing!)
- Store results for long-term progress tracking

## Core Responsibilities

The backend is responsible for: 
- Generating Morse code audio from text input 
- Managing user accounts and sessions 
- Recording and processing user audio 
- Measuring response timing 
- Performing speech recognition 
- Validating responses 
- Persisting session data

## Tech Stack

Language: TypeScript

Framework: NestJS (Node.js)

Web Server: Express (exposed via NestJS + serve-static)

Audio Processing: fluent-ffmpeg

Database: MongoDB

Process Management: PM2

Tooling: Prettier, ESLint

Infrastructure: DigitalOcean VPS with scheduled snapshot backups

## System Overview

#### High-level flow:

1.  Client requests a training session
2.  Backend generates Morse audio
3.  Client plays audio and records speech
4.  Audio is uploaded to backend
5.  Backend measures delay, recognizes speech, and validates response
6.  Results are stored and returned

## Key Features

-   Text-to-Morse audio generation
-   Configurable playback parameters
-   Speech recording ingestion
-   Response-time measurement
-   Automatic correctness evaluation
-   Persistent session tracking

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
