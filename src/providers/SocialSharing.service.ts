import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class SocialSharingService {

  constructor(public http: Http, public socialSharing: SocialSharing) { }

  public share(body: string) {
    let download = 'https://github.com/malubsi/econocart/releases/tag/0.0.1-beta1';
    body = 'O EconoCart me ajudou a achar ' + body.toLowerCase() + ' possível, me ajudando a economizar tempo e dinheiro, baixe você também e comece a poupar tempo e dinheiro';
    this.socialSharing.shareWithOptions({
      message: `${body} ${download}`, chooserTitle: 'Econocart o app que que ajuda a economizar.', files: 'www/icon/icon.png', subject: 'Econocart o app que que ajuda a economizar.'
    }).then(() => {
    }).catch((err) => {
    });
  }
}
