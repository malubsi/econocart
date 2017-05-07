#!/bin/bash

~/tocompile/sonarqube/bin/linux-x86-64/sonar.sh start
~/tocompile/sonar-scanner/bin/sonar-scanner -Dsonar.language=ts -Dsonar.sources=src -Dsonar.projectKey=EconoCart_v2

