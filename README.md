# SmartEval

Proctoring online platform for remote exams.

## Installation

To be able to run the SmartEval application, I have setup a fully working Docker environment
so the only thing that needs to be installed is Docker.

Go to https://docs.docker.com/get-docker/, choose your operating system and follow the instructions.

Note: for Windows environments a WSL2 backend is needed to run Docker. You can find the install
instructions in this Microsoft Documentation link https://docs.microsoft.com/en-us/windows/wsl/install-win10.

## Build

Note: If you have Windows or MacOS, make sure to have the docker for desktop running before executing the following steps.

This step builds the Docker images and it has to be performed just once.
Open a terminal (on Windows make sure to open your WSL2 distribution terminal) and run:
docker-compose build

## Run

In the same terminal run:
docker-compose up -d

It will create and start up the Docker containers running in the background.

## Stop / Start

If you have Docker for Windows or Mac you can do so via the GUI.
If you have Linux you'll have to type in the command line.

The commands for stop and start are the following:
 - Stop: docker-compose stop
 - Start: docker-compose start