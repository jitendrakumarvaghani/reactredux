const renderIndex = require('./../index');

describe('INDEX RENDER', () => {
  it('renders the APP COMPONENT into in a DOMElement', () => {
    renderIndex(document.createElement('div'));
  });
});
