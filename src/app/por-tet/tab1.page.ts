import { Component } from '@angular/core';
import { TetumtraService } from '../tetumtra.service';
import Tokenizer from 'sentence-tokenizer'

var tokenizer = new Tokenizer('Chuck');


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html'
})
export class Tab1Page {
  value = 'Um tradutor automático que traduz gratuitamente textos de Tétum. Desenvolvido no âmbito de um trabalho acadêmico de redes neuronais, esta aplicação poderá ser útil para muitas pessoas em Timor-Leste e resto do mundo.\n\nAvisa-se que as traduções automáticas poderão estar incorretas e que as devem verificar com tradutores qualificados ou nativos das respetivas línguas antes de as usar.'; 
  translation = ''
  constructor(public transService: TetumtraService) { }
  translate() {
    this.transService.translate('pttt', this, 20)
  }
}