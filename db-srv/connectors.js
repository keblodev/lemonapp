import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('tstlemon', null, null, {
  dialect: 'sqlite',
  storage: './tstlemon.sqlite',
});

const ChannelModel = db.define('channel', {
  name: { type: Sequelize.STRING },
});

const ChildChannelModel = db.define('childChannel', {
  name: { type: Sequelize.STRING },
});

ChannelModel.hasMany(ChildChannelModel);
ChildChannelModel.belongsTo(ChannelModel);

// create mock data with a seed, so we always get the same
casual.seed(1234);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return ChannelModel.create({
      name: casual.first_name,
    }).then((channel) => {
      return channel.createChildChannel({
        name: `A channel by ${channel.name}`,
      });
    });
  });
});

const Channel = db.models.channel;
const ChildChannel = db.models.childChannel;

export { Channel, ChildChannel };