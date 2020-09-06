import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer =  new Tokenizer('Chuck');

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  value = '';
  translation = ''
  constructor(public transService: TetumtraService) { }
  translate() {
    var trans = []
    var batch = []
    this.value.split(/\r?\n/).forEach(s1 =>{
      tokenizer.setEntry(s1)
      tokenizer.getSentences().forEach(s2 => {
        batch.push(s2)
      })
      batch.push('\n')
    })
    batch.forEach( (s,i) => {
      if (s.length > 1) {
        this.transService.Translate('pttt', s).subscribe(res => {
          trans[i] = res.translation + ' '
          this.translation = trans.join('')
        });        
      } else { 
        trans[i] = s
        this.translation = trans.join('')
      }
    })
  }
}