const testsContext = require.context('./', true, /.*spec\.jsx$/);
testsContext.keys().map(test => testsContext(test));
