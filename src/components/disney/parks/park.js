const Attraction = require('./attraction');
const Show = require('./show');
const Restaurant = require('./restaurant');

class Park {
    constructor(options = {}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.entityType = options.entityType || 'PARK';
        this.timezone = options.timezone || null;
        this.attractions = this.setAttractions(options);
        this.shows = this.setShows(options);
        this.restaurants = this.setRestaurants(options);
    }

    setAttractions(options) {
        return (options['liveData'].map((data) => {
            if (data['entityType'] === "ATTRACTION") {
                return new Attraction(data);
            }
            return null;
        })).filter(item => !!item);
    }

    get _attractions() {
        return this.attractions;
    }

    setShows(options) {
        return (options['liveData'].map((data) => {
            if (data['entityType'] === "SHOW") {
                return new Show(data);
            }
            return null;
        })).filter(item => !!item);
    }

    setRestaurants(options) {
        return (options['liveData'].map((data) => {
            if (data['entityType'] === "RESTAURANT") {
                return new Restaurant(data);
            }
            return null;
        })).filter(item => !!item);
    }

}

module.exports = Park;