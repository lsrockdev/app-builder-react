import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PreviewSetting extends Component {
  changeHandler = (e) => {
    this.props.onChange({ setting: this.props.setting, oldValue: this.props.value, newValue: e.target.value });
  }

  render() {
    const { setting, value } = this.props;

    return (
      <div style={{marginBottom: '30px'}}>
        <div style={{display: 'flex', paddingLeft: '10px', marginBottom: '10px'}}>
          <label style={{"color":"rgb(55, 109, 114)","fontSize":"16px"}}>{setting}</label>
        </div>
        <input type="text" className="autofill-input" value={value} onChange={this.changeHandler} />
      </div>
    );
  }
}

PreviewSetting.propTypes = {
  setting: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

class PreviewSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undoStack: [],
      redoStack: [],
      settings: {},
      dirty: false
    };
  }

  componentWillReceiveProps(newProps) {
    const { settings } = newProps;
    this.setState({settings});
  }

  changeHandler = (setting) => {
    const settings = { ...this.state.settings, [setting.setting]: setting.newValue };
    let undoStack = [setting];

    if (this.state.undoStack.length > 0) {
      const lastIndex = this.state.undoStack.length - 1;
      const last = this.state.undoStack[lastIndex];

      if (last.setting === setting.setting) {
        undoStack = this.state.undoStack.slice(0, lastIndex).concat({ ...last, newValue: setting.newValue });
      } else {
        undoStack = [...this.state.undoStack, setting];
      }
    }

    this.setState({ undoStack, redoStack: [], settings, dirty: true });
  }

  makeSettingsArray() {
    return Object.keys(this.state.settings).map(key => ({ setting: key, value: this.state.settings[key] }));
  }

  undoHandler = () => {
    const lastIndex = this.state.undoStack.length - 1;
    const undo = this.state.undoStack[lastIndex];

    this.setState({
      undoStack: this.state.undoStack.slice(0, lastIndex),
      redoStack: this.state.redoStack.concat(undo),
      settings: { ...this.state.settings, [undo.setting]: undo.oldValue },
      dirty: true
    });
  }

  redoHandler = () => {
    const lastIndex = this.state.redoStack.length - 1;
    const redo = this.state.redoStack[lastIndex];

    this.setState({
      undoStack: this.state.undoStack.concat(redo),
      redoStack: this.state.redoStack.slice(0, lastIndex),
      settings: { ...this.state.settings, [redo.setting]: redo.newValue },
      dirty: true
    });

  }

  saveHandler = () => {
    this.props.onSave(this.state.settings);
    this.setState({ dirty: false });
  }

  render() {
    const settings = this.makeSettingsArray();
    const { dirty } = this.state;
    const undoDisabled = this.state.undoStack.length === 0;
    const redoDisabled = this.state.redoStack.length === 0;

    return (
      <div style={{padding: '40px 50px'}}>
        <div style={{"display":"flex","flexWrap":"wrap","marginBottom":"30px","paddingLeft":"10px"}}>
          <button className="autofill-button" disabled={undoDisabled} onClick={this.undoHandler} style={{marginRight: '10px'}}>Undo</button>
          <button className="autofill-button" disabled={redoDisabled} onClick={this.redoHandler} style={{marginRight: '10px'}}>Redo</button>
          <button className="autofill-button" disabled={!dirty} onClick={this.saveHandler} style={{paddingRight: '10px', marginLeft: 'auto'}}>Save</button>
        </div>
        <div>
          {settings.map(setting => <PreviewSetting { ...setting }  key={setting.setting} onChange={this.changeHandler} />)}
        </div>
      </div>
    );
  }
}

PreviewSettingsForm.propTypes = {
  settings: PropTypes.object,
  onSave: PropTypes.func
};

export default PreviewSettingsForm;