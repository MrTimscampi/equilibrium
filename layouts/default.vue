<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
    <q-layout view="lHr lpR lfr">
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            side="left"
            bordered
            class="flex flex-column justify-center q-pa-md"
        >
            <span class="text-h4 q-mb-md">Equilibrium</span>
            <q-list class="fit">
                <q-item clickable>
                    <q-item-section> Planner </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section> Characters </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section> Light Cones </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section> Inventory </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section> Achievements </q-item-section>
                </q-item>
                <q-item clickable>
                    <q-item-section> Settings </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <q-page class="q-px-md q-pt-md q-pb-xl">
                <router-view />
            </q-page>
        </q-page-container>

        <q-footer
            bordered
            class="bg-grey-10 text-white q-pa-md text-center"
        >
            <p class="q-mb-sm">
                Honkai: Star Rail™ is a registered trademark of MiHoYo Co., Ltd.
                This site is not affiliated with or endorsed by miHoYo. Images
                and data © MiHoYo Co., Ltd.
            </p>
            <p class="q-mb-none">Made with ❤ by Equilibrium Contributors</p>
        </q-footer>
    </q-layout>
</template>
