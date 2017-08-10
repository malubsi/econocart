all:
	make release
	make sign
	make zipalign
	-make install

release:
	ionic cordova build --release android
	-rm ../android-release-unsigned.apk
	cp ./platforms/android/build/outputs/apk/android-release-unsigned.apk ../android-release-unsigned.apk

sign:
	make -C .. sign

zipalign:
	-rm ../android-release-signed-zipaligned.apk
	zipalign -v 4 ../android-release-signed.apk ../android-release-signed-zipaligned.apk

install:
	adb install -r ../android-release-signed-zipaligned.apk


