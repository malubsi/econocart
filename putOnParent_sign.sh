#!/bin/bash
cp android-release-unsigned.apk android-release-signed.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -storepass <your_password_here> -keypass <your_password_here> -keystore <keystore_file> android-release-signed.apk <stored_key_name>

