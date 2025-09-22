# Check out the live demo here - [interactive map](https://proy02.github.io/interactive_map/)

# How the map was created

For visualising maps over browsers, the whole workflow gets extremely messy since you have to convert from geojson to topojson!
To avoid the whole workflow, I integrated QGIS and Mapshaper 

## How the two softwares were integrated

First, the projection - I love the Sphere Molliweide projection (ESRI 53009) so I exported it as a geojson with the projection of my choice. In Mapshaper CLI, I gave this code - 

```sh
mapshaper ~/Downloads/FireCount.geojson \
	-proj +proj=moll \
	-classify field=NUMPOINTS \
	 colors='#f6f0eb,#f9b282,#e34a33,#b0175a,#6a176e,#2c105c,#000004' \
	 breaks=0,100,500,1000,5000,10000,20000,40000 \
	-style stroke=white stroke-width=0.3 \
	-o format=svg id-field=NAME ~/Desktop/world_fire_1.svg
```

## Why I chose QGIS and Mapshaper CLI

So, I figured, with SVGs, if you wnat full control then all you gotta do is attach ids and call them during development.
The whole QGIS + Mapshaper workflow enabled that for me by attaching the name of the countries as ids.


## Development

Once I had generated the .svg, for web development, I chose Svelte as its lightweight, nimble and perfect for interactive projects. 


## How to run the project
Clone the project and install dependencies:
```bash
git clone https://github.com/proy02/washed_away.git
cd washed_away
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

