import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer =  new Tokenizer('Chuck');

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html'
})
export class Tab3Page {
  value = 'Tradutór automátiku ida gratuitu ne\'ebé tradús testu tétum sira. Dezenvolve iha kontestu akadémiku ida ne\'ebé uza rede neural sira, aplikasaun ne\'e bele hanesan útil ba ema barak iha Timor-Leste no iha mundu tomak.\n\nIta aviza katak tradusaun automátiku sira bele la loos no tenki verifika ho tradutór kualifikadu ka nativu sira hosi lian sira antes uza.';
  translation = ''
  queue = 0
  constructor(public transService: TetumtraService) { }
  translate() {
    this.transService.translate('tten', this)
  }
}