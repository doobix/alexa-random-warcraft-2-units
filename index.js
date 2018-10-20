/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeWarcraft2 = require('see-warcraft-2');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomWarcraftUnit');
  },
  'GetRandomWarcraftUnit': function() {
    const swc = new SeeWarcraft2();
    const randomUnit = swc.getRandomUnit();
    const speechOutput = `Your random Warcraft 2 unit is: ${randomUnit.name}, from the ${randomUnit.faction} faction.`;
    this.emit(
      ':tellWithCard',
      speechOutput,
      'Random Warcraft II Units',
      `Unit: ${randomUnit.name}. Faction: ${randomUnit.faction}.`
    );
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random Warcraft 2 unit. Would you like to hear one?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomWarcraftUnit');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
