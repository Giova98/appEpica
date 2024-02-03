import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController);

  

async takePicture(promptLabelHeader: string){
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una Imagen wachin',
    promptLabelPicture: 'Toma una foto'
  });

};

  // ============ Alert =============
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  // ========= Loading ===============
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }


  //======== Toast ===========
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


  //======== Enruta a cualquiera pagina disponible ===========
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  //======== Guardar un elemento localmente ===========
  saveInLocalStoraged(key: string, value: any){
     return localStorage.setItem(key, JSON.stringify(value))
  }

  //======== Obtiene un elemento de localStorage ===========
  getFromLocalStoraged(key: string){
    return JSON.parse (localStorage.getItem(key))
  }

  //======== Modal ===========
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) return data;
  }
    dismissModal(data?: any ){
       return this.modalCtrl.dismiss(data);
    }


}
