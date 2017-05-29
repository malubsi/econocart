import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SocialSharingService {
    constructor(
        public socialSharing: SocialSharing,
    ){
    }

    public body = 'O EconoCart me ajudou a achar substituir possível, me ajudando a economizar tempo e dinheiro, baixe você também e comece a poupar tempo e dinheiro';
    public download = 'https://github.com/malubsi/econocart/releases';
    public message: string;
    public files = ['https://raw.githubusercontent.com/malubsi/econocart/master/resources/icon.png'];
    public file = 'https://raw.githubusercontent.com/malubsi/econocart/master/resources/icon.png';
    public subject = 'Econocart o app que que ajuda a economizar.';

    public socialMedia(): string[] {
        let socialMedia = ['megaphone', 'logo-facebook', 'logo-instagram', 'logo-twitter', 'logo-whatsapp'];
        return socialMedia;
    }
    public share(body: string, media) {
        this.body = this.body.replace('substituir', body.toLowerCase());
        this.message = `${this.body} ${this.download}`;
        switch (media) {
            case 'logo-whatsapp': {
                return new Promise<boolean>((resolve, reject) => { this.whatsapp().then(resolve, reject); });
            }
            case 'logo-facebook': {
                return new Promise<boolean>((resolve, reject) => { this.facebook().then(resolve, reject); });
            }
            case 'logo-instagram': {
                return new Promise<boolean>((resolve, reject) => { this.instagram().then(resolve, reject); });
            }
            case 'logo-twitter': {
                return new Promise<boolean>((resolve, reject) => { this.twitter().then(resolve, reject); });
            }
            default: {
                return new Promise<boolean>((resolve, reject) => { this.all().then(resolve, reject); });
            }

        }
    }
    public all() {
        return new Promise<boolean>((resolve, reject) => {
            this.socialSharing.shareWithOptions({
                message: this.message,
                chooserTitle: this.subject,
                files: this.files,
                subject: this.subject
            }).then(() => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })
        });
    }
    public twitter(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.socialSharing.shareViaTwitter(this.message, this.file, this.download).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }
    public instagram(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.socialSharing.shareViaInstagram(this.message + ' ' + this.download, this.file).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }
    public facebook(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.socialSharing.shareViaFacebookWithPasteMessageHint(this.message, this.file, this.download).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }
    public whatsapp(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.socialSharing.shareViaWhatsApp(this.message, this.file, this.download).then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });
        });
    }
}
