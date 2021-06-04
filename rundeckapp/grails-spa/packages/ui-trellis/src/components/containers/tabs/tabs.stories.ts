import Vue from 'vue'
import {addons} from '@storybook/addons'
import {CHANGE, array ,object, boolean, withKnobs, select} from '@storybook/addon-knobs'

import '../../../stories/setup'

import Tabs from './Tabs'
import Tab from './Tab'
import TabContent from './TabContent.vue'

export default {
    title: 'Containers/Tabs',
    decorators: [withKnobs({disableDebounce: true})]
}

function setupStory(vue: Vue) {
    const el = vue.$el as any
    el.parentNode.style.height = '100vh'
    el.parentNode.style.overflow = 'hidden'
    el.parentNode.style.position = 'relative'
    el.parentNode.style.padding = '20px'
    document.body.style.overflow = 'hidden'
}

export const tabs = () => {
    const chan = addons.getChannel()

    return Vue.extend({
        template: `
        <Tabs v-bind="$props">
            <Tab :index="0" title="Tab Foo"><TabContent>Foo Content</TabContent></Tab>
            <Tab :index="1" title="Tab Bar"><TabContent><input type="text"/></TabContent></Tab>
            <Tab :index="2" title="Tab Baz">Baz Content</Tab>
            <Tab :index="3" title="Tab Batch Processing">Batch Content</Tab>
        </Tabs>`,
        components: {Tabs, Tab, TabContent},
        props: {
            type: {default: select('style', {standard: 'standard', card: 'card'}, 'standard')}
        },
        mounted() {
            setupStory(this)
        },
        methods: {
            handleChecked(val: boolean) {
                chan.emit(CHANGE, {name: 'checked', value: val})
            }
        }
    })
}