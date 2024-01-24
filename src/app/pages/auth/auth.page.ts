import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit(): void {
  }


async submit(){
    if (this.form.valid){
      
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {

        this.getUserInfo(res.user.uid);
        
      }).catch(error => {
         console.log(error);

         this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert'
         })
         
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid: string){
    if (this.form.valid){
      
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `user/${uid}`;
      

      this.firebaseSvc.getDocument(path).then((user: User) => {
  
       this.utilsSvc.saveInLocalStoraged('user', user)
       this.utilsSvc.routerLink('/main/home');
       this.form.reset();

       this.utilsSvc.presentToast({
        message: `Te damos la bienvenida ${user.name}`,
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'person-circle-outline'
       })

      }).catch(error => {
         console.log(error);

         this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert'
         })
         
      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}
