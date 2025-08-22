<template>
    <div class="bars" id="bars" :style="boxStyle">
        <!-- Columnar Bar -->
        <div class="bar" v-for="(item, index) in defaultList" :key="index" :style="itemAttr(item)"></div>
    </div>
</template>

<script setup>
    const props = defineProps({
        analyser: {
            type: Object
        },
        dataArray: {
            type: [Array, Uint8Array]
        },
        isCalling: {
            type: Boolean,
            default: false
        },
        isPlaying: {
            type: Boolean,
            default: false
        },
        // Container height
        boxStyle: {
            type: Object,
            default: () => {
                return {
                    height: '80px'
                };
            }
        },
        // Bar width
        itemStyle: {
            type: Object,
            default: () => {
                return {
                    width: '6px',
                    margin: '0 2px',
                    borderRadius: '5px'
                };
            }
        },
        configList: {
            type: Array,
            default: () => []
        }
    });
    const animationFrameId = ref();
    const defaultList = ref([]);
    const bgColor = ref('#4c5cf8');
    const itemAttr = computed(() => item => {
        return {
            height: item + 'px',
            ...props.itemStyle
        };
    });
    watch(
        () => props.dataArray,
        newVal => {
            if (newVal && props.isCalling) {
                console.log('draw');
                drawBars();
            } else {
                console.log('stop');
                stopDraw();
            }
        }
    );
    watch(
        () => props.configList,
        newVal => {
            if (newVal.length > 0) {
                defaultList.value = newVal;
            }
        },
        { immediate: true }
    );
    watch(
        () => props.isPlaying,
        newVal => {
            if (newVal) {
                // green
                bgColor.value = '#4dc100';
            } else {
                // blue
                bgColor.value = '#4c5cf8';
            }
        }
    );
    function drawBars() {
        const bars = document.querySelectorAll('.bar');
        if (bars.length === 0) {
            cancelAnimationFrame(animationFrameId.value);
            return;
        }

        const maxHeight = document.querySelector('.bars').clientHeight; // The maximum height is the height of the container

        const averageVolume = props.dataArray.reduce((sum, value) => sum + value, 0) / props.dataArray.length;
        const normalizedVolume = props.isPlaying ? Math.random() : averageVolume / 128; // Normalize the volume data to between 0 and 1

        bars.forEach((bar, index) => {
            const minHeight = defaultList.value[index];
            const randomFactor = Math.random() * 1.5 + 0.5; // Random Factor
            const newHeight = Math.min(
                maxHeight,
                minHeight + (maxHeight - minHeight) * normalizedVolume * randomFactor
            ); // Set the height according to the volume
            bar.style.height = `${newHeight}px`; // Set a new altitude
            bar.style.backgroundColor = bgColor.value;
        });

        animationFrameId.value = requestAnimationFrame(drawBars);
    }
    const stopDraw = () => {
        if (animationFrameId.value) {
            cancelAnimationFrame(animationFrameId.value);
        }
    };
</script>

<style lang="less" scoped>
    .bars {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bar {
        // width: 6px;
        // margin: 0 2px;
        background-color: #4c5cf8;
        transition:
            height 0.1s,
            background-color 0.1s;
        border-radius: 5px; /* Rounded Corners */
    }
</style>
