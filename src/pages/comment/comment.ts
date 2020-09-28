import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment } from '../../shared/comment';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  commentForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this._initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss(commentData: Comment) {
    commentData
      ? this.viewCtrl.dismiss(commentData)
      : this.viewCtrl.dismiss();
  }

  onSubmit() {
    const comment = this.commentForm.value as Comment;
    comment.date = new Date().toISOString();

    this.dismiss(comment);
  }

  private _initForm() {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

}
