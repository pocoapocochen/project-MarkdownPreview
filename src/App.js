import React, { Component } from 'react';
import marked from 'marked';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faEye, faArrowCircleDown, faArrowCircleUp, faMusic, faHeart } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faCode, faEye, faArrowCircleDown, faArrowCircleUp, faMusic, faHeart);


// set options: new tab link
// https://github.com/markedjs/marked/issues/655
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a href=${href} target="_blank"> ${text} </a>`;

// set options: line break
// https://github.com/markedjs/marked/blob/master/docs/USING_ADVANCED.md#options
marked.setOptions({
  breaks: true
});

const placeholder = 
`# Header
## Sub Header

---
**bold text**
> Block quote

---
\`<p>inline code</p>\`
\`\`\`
//code block
//code block
//code block
\`\`\`

---
Unordered List:
* list item
* list item
* list item

Ordered List:
1. list item
2. list item
3. list item

---
[website](https://en.wikipedia.org/wiki/Markdown)

![image](https://imgplaceholder.com/100x100/cccccc/757575/fa-file-photo-o?text=M)
`;

// define grandchild component
const EditorTab = () => {
  return (
     <div id="editortab_div" className="tab_div">
      <div className="tabicon"><FontAwesomeIcon icon="code" />Editor</div>
      <a className="linkicon" href="https://en.wikipedia.org/wiki/Markdown#Example" target="_blank">Markdown Example</a>
      <a className="buttonicon" href="#preview_div"><FontAwesomeIcon icon="arrow-circle-down" /></a>
     </div> 
  );
};

// define grandchild component
const PreviewTab = () => {
  return (
      <div id="previewtab_div" className="tab_div">
      <div className="tabicon"><FontAwesomeIcon icon="eye" />Previewer</div>
      <a className="buttonicon" href="#editor_div"><FontAwesomeIcon icon="arrow-circle-up" /></a>
      </div>
  );
};


// define child component
const Editor = (props) => {
  return (
    <div id="editor_div" className="markdown_div">
      <EditorTab />
      <textarea id="editor" value={props.value} onChange={props.onChange} />
    </div>  
  );
};

// define child component
// note: https://reactjs.org/docs/dom-elements.html
const Preview = (props) => {
  return (
    <div id="preview_div" className="markdown_div">
      <PreviewTab />
      <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.value, {renderer: renderer})}} />  
    </div>
  );
}; 

// define child component
const Copyright = () => {
  return (
    <p id="copyright" class="text-center">Designed and coded by <a href="https://codepen.io/pocoapocochen" title="My Dashboard"> Yu-jie </a> with <FontAwesomeIcon icon="music" /> & <FontAwesomeIcon icon="heart" /></p>
    );
};

// define parent component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  
  render() {
    return (
      <div id="container">
        <div id="wrap">
        <Editor value={this.state.text} onChange={this.handleChange} />
        <Preview value={this.state.text} />
        </div>
        <Copyright/>
      </div>
    )
  };
}

export default App;
