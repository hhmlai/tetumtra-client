import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer =  new Tokenizer('Chuck');

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html'
})

export class Tab4Page {
  value = 'An automatic translator that translates Tetum texts for free. Developed in an academic context using neural networks, this application could be useful for many people in Timor-Leste and the rest of the world.\n\nPlease note that automatic translations may be incorrect and that you should check with qualified translators or native speakers of the respective languages before using them.';
  translation = ''
  queue = 0
  constructor(public transService: TetumtraService) { }
  translate() {
    this.transService.translate('entt', this)
  }
}