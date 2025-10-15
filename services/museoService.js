const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching speakers information
 */
class museoService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the speakers data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of speakers name and short name
   */
  async getNombre() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map(museo => {
      return { nombre: museo.nombre, cortoname: museo.cortoname };
    });
  }

  /**
   * Get all artwork
   */
  async getAllcuadro() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all speakers and
    // create an array that contains all artwork
    const museo = data.reduce((acc, elm) => {
      if (elm.artwork) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.artwork];
      }
      return acc;
    }, []);
    return museo;
  }

  /**
   * Get all artwork of a given speaker
   * @param {*} shortname The speakers short name
   */
  async getArtworkForSpeaker(shortname) {
    const data = await this.getData();
    const speaker = data.find(elm => {
      return elm.shortname === shortname;
    });
    if (!speaker || !speaker.artwork) return null;
    return speaker.artwork;
  }

  /**
   * Get speaker information provided a shortname
   * @param {*} shortname
   */
  async getSpeaker(shortname) {
    const data = await this.getData();
    const speaker = data.find(elm => {
      return elm.shortname === shortname;
    });
    if (!speaker) return null;
    return {
      title: speaker.title,
      name: speaker.name,
      shortname: speaker.shortname,
      description: speaker.description,
    };
  }

  /**
   * Returns a list of speakers with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map(speaker => {
      return {
        name: speaker.name,
        shortname: speaker.shortname,
        title: speaker.title,
      };
    });
  }

  /**
   * Get a list of speakers
   */
  async getList() {
    const data = await this.getData();
    return data.map(speaker => {
      return {
        name: speaker.name,
        shortname: speaker.shortname,
        title: speaker.title,
        summary: speaker.summary,
      };
    });
  }

  /**
   * Fetches speakers data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).speakers;
  }
}

module.exports = museoService;
