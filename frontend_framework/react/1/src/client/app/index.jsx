import React from 'react';
import { render } from 'react-dom';
import { IntlProvider, FormattedMessage, addLocaleData } from "react-intl";

import messagess from './messages';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

addLocaleData([...en, ...fr]);

/*
addLocaleData({ locale: languageCode, pluralRuleFunction: () => {}, });


const cache = createIntlCache()

const intl = createIntl({
  locale: 'fr-FR',
  messages: {}
}, cache)
*/

const locale = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';



const messages = {
  en: {
    greeting: "Hello {name}! How are you?",
    time: "The time is {t, time, short}.",
    date: "The date is {d, date}."
  },
  es: {
    greeting: "¡Hola {name}! ¿Cómo estás?",
    time: "La hora es {t, time, short}.",
    date: "La fecha es {d, date}."
  },
  fr: {
    greeting: "Bonjour {name}! Comment ça va?",
    time: "Il est {t, time, short}.",
    date: "La date est {d, date}."
  },
  de: {
    greeting: "Hallo {name}! Wie geht's?",
    time: "Es ist {t, time, short} Uhr.",
    date: "Das Datum ist {d, date}."
  }
};

//const [locale, setLocale] = useState("en"); 


class App extends React.Component {

  // handleSelect(e)  {
  //     setLocale(e.target.value);
  // } 

  constructor(props) {
    super(props);
    this.state = {
      setName: "unknown",
      locale: "en",
      lc : "en-GB"
    }
  }


  handleChange2(e) {
    //setName(e.target.value);
    //this.state.setName = e.target.value;

    console.log("Handle function : " + e.target.value);

    this.setState({ locale: e.target.value });

    if(  e.target.value === "en"){
       this.setState({ lc: "en-GB" });
    }

    if(  e.target.value === "fr"){
         this.setState({ lc: "fr-FR" });
    }

  }


// , "en-GB" , "fr-FR"

  f5() {

    return (
      <div>
        <IntlProvider locale={this.state.lc} messages={messagess[this.state.lc]}>
          {/* Previous code... */}
          <p>
           <FormattedMessage id="homepage.welcome" />
           <br />
          <FormattedMessage id="user.hello" values={{ username: 'Arnaud' }} />
          </p>
        </IntlProvider>
      </div>
    );


  }


  f4() {

    // let locale = "en";


    //const [name, setName] = useState("");





    const handleChange = e => {
      //setName(e.target.value);
      //this.state.setName = e.target.value;

      this.setState({ internalState: e.target.value });
    };


    return (
      <p>
        <input placeholder="Enter name" onChange={handleChange} />




        <IntlProvider locale={this.state.locale} messages={messages[this.state.locale]} key={this.state.locale}>
          <p>
            <FormattedMessage id="greeting" values={{ name }} />
            <br />
            <FormattedMessage id="time" values={{ t: Date.now() }} />
            <br />
            <FormattedMessage id="date" values={{ d: Date.now() }} />
          </p>
        </IntlProvider>

      </p>
    );


  }


  f3() {

    let name = "hellooo";

    /*
    return(
     <p>
              <FormattedMessage id="greeting" values={{ name }} />
              <br />
              <FormattedMessage id="time" values={{ t: Date.now() }} />
              <br />
              <FormattedMessage id="date" values={{ d: Date.now() }} />
            </p>
    );
    */

    //let locale = "en";
    let langmsg = messages[this.state.locale];
    let strlang = JSON.stringify(langmsg);
    let elem = messages[this.state.locale].greeting;

    return (<div> <font color="green"> {elem} </font> </div>);

  }



  f2() {




    return "text123";
  }



  f1() {
    const [name, setName] = useState("");

    const handleChange = e => {
      setName(e.target.value);
    };

    //const locale = "en";

    return (
      <p>
        <input placeholder="Enter name" onChange={handleChange} />

        <IntlProvider locale={this.state.locale} messages={messages[this.state.locale]}>
          <p>
            <FormattedMessage id="greeting" values={{ name }} />
            <br />
            <FormattedMessage id="time" values={{ t: Date.now() }} />
            <br />
            <FormattedMessage id="date" values={{ d: Date.now() }} />
          </p>
        </IntlProvider>
      </p>
    );
  }




  render() {


    let renderOption = (
      <div>
        <select onChange={(e) => this.handleChange2(e)} >
          {["en", "es", "fr", "de" ].map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
    );


    let a = "..." + navigator.language;

    /*
      const [name, setName] = useState("");
    
      const handleChange = e => {
        setName(e.target.value);
      };
    
      const [locale, setLocale] = useState("en");
    
      const handleSelect = e => {
        setLocale(e.target.value);
      }; 
    */

    /*
 
 <select onChange={this.handleSelect} defaultValue={locale}>
           {["en", "es", "fr", "de"].map(l => (
             <option key={l}>{l}</option>
           ))}
         </select>
 
    
    <IntlProvider locale={locale} messages={messages[locale]}>
         <p>
           <FormattedMessage id="greeting" values={{ name }} />
           <br />
           <FormattedMessage id="time" values={{ t: Date.now() }} />
           <br />
           <FormattedMessage id="date" values={{ d: Date.now() }} />
         </p>
       </IntlProvider>
    
    
    
 
     return (
       <div>
         <select onChange={this.handleSelect}>
           {["en", "es", "fr", "de"].map(l => (
             <option key={l}>{l}</option>
           ))}
         </select>
         <p> Hello React!  </p>
         
       </div>);
 */

    return (<div> {renderOption} {this.f3()}  {this.f4()} <font color="orange"> {a} {this.f5()} </font> </div>);


  }
}
render(<App />, document.getElementById('app'));
console.log('Hello World!');
