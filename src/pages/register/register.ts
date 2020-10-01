import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


interface RegistrationDataType {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  telnum: string;
  email: string;
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  regForm: FormGroup;
  image = 'assets/images/logo.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private camera: Camera
  ) {
    this._initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(regData?: RegistrationDataType) {
    regData
      ? this.viewCtrl.dismiss(regData)
      : this.viewCtrl.dismiss();
  }

  getPicture() {
    const camOptions: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
    };

    // Fix path access, destinationType must be DATA_URL
    // this.camera.getPicture(camOptions)
    //   .then(imageBase64 => {
    //     let txtForImage = `data:image/png;base64,` + imageBase64;
    //     this.image = txtForImage;
    //   })
    //   .catch(errMsg => console.error('Error obtaining the picture', errMsg));

    this.camera.getPicture(camOptions)
      .then(imgFileURI => {
        if (imgFileURI) {

          // Fix the url access Error
          const win: any = window; // hack ionic/angular compilator
          const newImgFileURI = win.Ionic.WebView.convertFileSrc(imgFileURI);

          this.image = newImgFileURI;
        }
      })
      .catch(errMsg => console.error('Error obtaining the picture', errMsg));
  }

  onSubmit() {
    const regData = { ...this.regForm.value } as RegistrationDataType;

    console.log('Registred sccessfully:', regData);
    this.dismiss(regData);
  }

  private _initForm() {
    this.regForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
