#!/bin/bash

~/tocompile/sonarqube/bin/linux-x86-64/sonar.sh start
~/tocompile/sonar-scanner/bin/sonar-scanner -Dsonar.host.url=http://127.0.0.1:9000

