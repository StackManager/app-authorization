import 'module-alias/register';
const moduleAlias = require('module-alias');
const _dir = __dirname + '/..';

moduleAlias.addAlias('@Configuration', _dir + '/app-payment-commons');
moduleAlias.addAlias('@Commons', _dir + '/commons');
moduleAlias.addAlias('@App', _dir + '/app.ts');