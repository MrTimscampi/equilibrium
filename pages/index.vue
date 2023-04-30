<script lang="ts" setup>
import events from '@/data/events.json';
import banners from '@/data/banners.json';
import changelog from '@/data/changelog.json';
import { DateTime } from 'luxon';
import humanizeDuration from 'humanize-duration';

const currentEvents = events.filter((event) => {
    // Get the current date, without the time
    const now = new Date();

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return startDate <= now && now <= endDate;
});

const upcomingEvents = events.filter((event) => {
    const now = new Date();

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return now <= startDate && now <= endDate;
});

function getRemainingTimeAsHumanReadable(event) {
    const now = DateTime.now();
    const endDate = DateTime.fromISO(event.endDate);

    const remaining = endDate.diff(now, ['days', 'hours', 'minutes']);

    return humanizeDuration(remaining.toMillis(), {
        units: ['d', 'h', 'm'],
        largest: 2,
        round: true,
    });
}

function getTimeUntilStartAsHumanReadable(event) {
    const now = DateTime.now();
    const startDate = DateTime.fromISO(event.startDate);

    const remaining = startDate.diff(now, ['days', 'hours', 'minutes']);

    return humanizeDuration(remaining.toMillis(), {
        units: ['d', 'h', 'm'],
        largest: 2,
        round: true,
    });
}

let activeBanners = banners.filter((banner) => {
    // Handle permanent banners
    if (banner.startDate === null && banner.endDate === null) {
        return true;
    }

    const now = new Date();

    const startDate = new Date(banner.startDate);
    const endDate = new Date(banner.endDate);

    return startDate <= now && now <= endDate;
});
</script>

<template>
    <div class="column">
        <q-card
            flat
            class="text-center q-pa-md"
        >
            <p class="text-h6 text-weight-bold q-mb-sm">
                Equilibrium helps you plan your daily grind and track your
                progress in Honkai: Star Rail.
            </p>
            <p class="text-body1 q-mb-none">
                Add your characters, weapons, light cones, relics and the
                contents of your inventory to get daily recommendations on what
                you need, what you can craft, and which daily tasks you should
                focus on.
            </p>
        </q-card>
        <h2 class="text-h5">Current events</h2>
        <div class="row q-col-gutter-md">
            <div
                v-for="event in currentEvents"
                :key="`event-${event.id}`"
                class="col-12 col-md-6 col-lg-4"
            >
                <q-btn
                    color="grey-10"
                    align="between"
                    class="full-width full-height"
                    :href="event.link"
                >
                    <q-chip color="primary">{{ event.type }}</q-chip>
                    <div class="column text-right">
                        <span class="text-body1 text-weight-bold q-mb-none">
                            {{ event.name }}
                        </span>

                        <span class="text-caption text-weight-thin">
                            {{ getRemainingTimeAsHumanReadable(event) }}
                        </span>
                    </div>
                </q-btn>
            </div>
            <div v-if="currentEvents.length === 0">
                <p class="text-body1 q-mb-none">There are no current events.</p>
            </div>
        </div>
        <h2 class="text-h5">Upcoming events</h2>
        <div class="row q-col-gutter-md">
            <div
                v-for="event in upcomingEvents"
                :key="`event-${event.id}`"
                class="col-12 col-md-6 col-lg-4"
            >
                <q-btn
                    color="grey-10"
                    align="between"
                    class="full-width full-height"
                    :href="event.link"
                >
                    <q-chip color="primary">{{ event.type }}</q-chip>
                    <div class="column text-right">
                        <span class="text-body1 text-weight-bold q-mb-none">
                            {{ event.name }}
                        </span>

                        <span class="text-caption text-weight-thin">
                            {{ getTimeUntilStartAsHumanReadable(event) }}
                        </span>
                    </div>
                </q-btn>
            </div>
            <div v-if="upcomingEvents.length === 0">
                <p class="text-body1 q-mb-none">
                    There are no upcoming events.
                </p>
            </div>
        </div>
        <h2 class="text-h5">Active banners</h2>
        <div class="row q-gutter-md">
            <div
                v-for="banner in activeBanners"
                :key="`banner-${banner.id}`"
                style="width: 600px"
            >
                <q-btn
                    color="grey-10"
                    stack
                    class="full-width full-height q-pt-none q-px-none"
                    :href="banner.link"
                >
                    <q-img :src="`/images/warps/${banner.id}.webp`" />
                    <div class="column text-center q-mt-xs q-px-md">
                        <span class="text-body1 text-weight-bold q-mb-none">
                            {{ banner.name }}
                        </span>

                        <span class="text-caption text-weight-thin">
                            {{
                                banner.endDate
                                    ? getRemainingTimeAsHumanReadable(banner)
                                    : 'Permanent'
                            }}
                        </span>
                    </div>
                </q-btn>
                <div v-if="activeBanners.length === 0">
                    <p class="text-body1 q-mb-none">
                        There are no active banners.
                    </p>
                </div>
            </div>
        </div>
        <h2 class="text-h5">Changelog</h2>
        <q-list
            bordered
            class="rounded-borders"
        >
            <q-expansion-item
                v-for="item in changelog"
                :key="`changelog-${item.id}`"
                :label="`Version ${item.version}`"
                :caption="
                    DateTime.fromISO(item.date).toLocaleString(
                        DateTime.DATE_MED,
                    )
                "
                expand-icon="mdi-chevron-down"
                expanded-icon="mdi-chevron-up"
            >
                <q-card>
                    <q-card-section>
                        <ul>
                            <li
                                v-for="(change, index) in item.changes"
                                :key="`changelog-${item.id}-${index}`"
                            >
                                {{ change }}
                            </li>
                        </ul>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<style scoped></style>
