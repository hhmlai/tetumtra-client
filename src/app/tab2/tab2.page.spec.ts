import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer =  new Tokenizer('Chuck');

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  value = '';
  translation = ''
  constructor(public transService: TetumtraService) { }
  translate() {
    this.translation = ''
    var batch = []
    this.value.split(/\r?\n/).forEach(s1 =>{
      tokenizer.setEntry(s1)
      tokenizer.getSentences().forEach(s2 => {
        this.transService.Translate('ttpt', s2)
        .subscribe(res => { this.translation += ' ' + res.translation});
      })
  
    })
    console.log(batch)
  }
}
