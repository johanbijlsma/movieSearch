import { describe, expect, it } from "vitest";

import MovieSearch from "../MovieSearch.vue";
import { mount } from "@vue/test-utils";

describe("MovieSearch", () => {
    it("renders properly", () => {
        const wrapper = mount(MovieSearch);
        expect(wrapper.text()).toContain(
            "To start using this site, please enter a search query to look for Movie titles."
        );
    });
    it("randomlySuggest", () => {
        const wrapper = mount(MovieSearch);
        const suggestion = wrapper.find(".suggestion");
        wrapper.vm.randomChosen = 4;
        console.log(wrapper.vm.randomChosen);
        expect(suggestion.text()).toContain("The Godfather"
        );
        // expect(suggestion.text()).toContain(
        //     "Star Wars" ||
        //     "Spiderman" ||
        //     "James Bond" ||
        //     "Spongebob Squarepants" ||
        //     "The Godfather" ||
        //     "The Shawshank Redemption" ||
        //     "The Matrix" ||
        //     "the Lego Movie"
        // );
    });
});
