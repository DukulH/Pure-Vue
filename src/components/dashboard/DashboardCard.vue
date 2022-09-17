<template>
<div :style="{'background-color': backgroundColor}" style="height: 150px; border-radius: 10px;">
 <div class="row p-4">
    <div class="col-md-6">
        <h3 :style="{'color': countColor}">{{count}}</h3>
        <p  :style="{'color': nameColor}">{{name}}</p>
    </div>
    <div class="cold-md-6">

    </div>
 </div>
</div>
</template>
<script>
export default {
    props:[
        'backgroundColor',
        'count',
        'name',
        'icon',
        'nameColor',
        'countColor'
    ]
}
</script>
<style>

</style>