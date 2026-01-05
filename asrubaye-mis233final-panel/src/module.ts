import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  builder
    .addTextInput({
      path: 'panelTitle',
      name: 'Panel title',
      defaultValue: 'MIS233 Final Panel',
    })
    .addBooleanSwitch({
      path: 'showAuthor',
      name: 'Show author',
      defaultValue: true,
    })
    .addTextInput({
      path: 'authorText',
      name: 'Author text',
      defaultValue: 'Developed by Alyaa Al-Rubaye',
      showIf: (opts) => opts.showAuthor,
    });

  return builder;
});
