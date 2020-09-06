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
  queue = 0
  constructor(public transService: TetumtraService) { }
  translate() {
    this.queue = 0
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
        this.queue += 1
        this.transService.Translate('ttpt', s).subscribe(res => {
          trans[i] = res.translation + ' '
          this.translation = trans.join('')
          this.queue -= 1
        });        
      } else { 
        trans[i] = s
        this.translation = trans.join('')
        this.queue -= 1
      }
    })
  }
}