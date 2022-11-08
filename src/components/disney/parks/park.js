/* This class is used to create a Park object that contains an array of Attraction, Show, and
Restaurant objects */
import Attraction from './attraction';
import Show from './show';
import Restaurant from './restaurant';

export default class Park {
    constructor(options = {}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.entityType = options.entityType || 'PARK';
        this.timezone = options.timezone || null;
        this.attractions = this.setAttractions(options);
        this.shows = this.setShows(options);
        this.restaurants = this.setRestaurants(options);
    }

    /**
     * It takes an object with a property called liveData, which is an array of objects. If the object
     * in the array has a property called entityType with a value of ATTRACTION, then it returns a new
     * Attraction object with the data
     * @param options - The options object that is passed to the function.
     * @returns An array of Attraction objects.
     */
    setAttractions(options) {
        return options['liveData'] ? (options['liveData']?.map((data) => {
            if (data['entityType'] === "ATTRACTION") {
                return new Attraction(data);
            }
            return null;
        })).filter(item => !!item) : null;
    }

    /**
     * The function returns the value of the attractions property
     * @returns The attractions array.
     */
    get _attractions() {
        return this.attractions;
    }

    /**
     * It takes an object with a property called liveData and returns an array of Show objects.
     * @param options - The options object passed to the function.
     * @returns An array of Show objects.
     */
    setShows(options) {
        return options['liveData'] ? (options['liveData']?.map((data) => {
            if (data['entityType'] === "SHOW") {
                return new Show(data);
            }
            return null;
        })).filter(item => !!item) : null;
    }

    /**
     * It takes an object with a property called liveData, which is an array of objects, and returns an
     * array of Restaurant objects
     * @param options - The options object that is passed to the function.
     * @returns An array of restaurants.
     */
    setRestaurants(options) {
        return options['liveData'] ? (options['liveData']?.map((data) => {
            if (data['entityType'] === "RESTAURANT") {
                return new Restaurant(data);
            }
            return null;
        })).filter(item => !!item) : null;
    }

}

