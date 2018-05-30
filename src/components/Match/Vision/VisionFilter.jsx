import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Table from '../../Table';
import Heading from '../../Heading';

import PlayerThumb from '../PlayerThumb';

const data = [
  {
    type: 'observer',
    image: <img height="24" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} alt="" />,
  },
  {
    type: 'sentry',
    image: <img height="24" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} alt="" />,
  },
];

class VisionFilter extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      players: PropTypes.arrayOf({}),
    }),
    parent: PropTypes.shape({
      state: PropTypes.shape({
        players: PropTypes.arrayOf({}),
        teams: PropTypes.arrayOf({}),
      }),
      setPlayer: PropTypes.func,
      teams: PropTypes.arrayOf({}),
      setTeam: PropTypes.func,
    }),
    strings: PropTypes.shape({}),
  }

  columns(index) {
    return [
      {
        displayName: <Checkbox
          checked={this.props.parent.state.teams[index === 0 ? 'radiant' : 'dire']}
          onCheck={(event, checked) => {
            this.props.parent.setTeam(index === 0 ? 'radiant' : 'dire', checked);
          }
          }
        />,
        displayFn: row => row.image,
      },
      this.playerColumn(0 + index),
      this.playerColumn(1 + index),
      this.playerColumn(2 + index),
      this.playerColumn(3 + index),
      this.playerColumn(4 + index),
    ];
  }

  playerColumn(playerNumber) {
    return {
      displayName: <PlayerThumb {...this.props.match.players[playerNumber]} hideText />,
      displayFn: row => (<Checkbox
        checked={this.props.parent.state.players[row.type][playerNumber]}
        onCheck={(event, checked) => {
          this.props.parent.setPlayer(playerNumber, row.type, checked);
        }
        }
      />),
    };
  }

  render() {
    const { strings } = this.props;
    return (
      <div>
        <Heading title={strings.general_radiant} />
        <Table data={data} columns={this.columns(0)} />
        <Heading title={strings.general_dire} />
        <Table data={data} columns={this.columns(5)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(VisionFilter);
