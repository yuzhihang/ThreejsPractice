<template>

    <div id="app">
        <div id="stats-output">

        </div>
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // import * as THREE from 'three'
    import THREE from './learning-threejs-master/libs/three'
    import Stats from './learning-threejs-master/libs/stats'
    import dat from './learning-threejs-master/libs/dat.gui'
    // import State from 'sta'

    export default {
        // elm:'#app',
        data: () => ({
            controls: {
                scene: null,
                camera: null,
                renderer: null,
                rotationSpeed: 0.02
            }
        }),
        created() {
            this.$nextTick(() => {
                this.init()
            })
        },
        methods: {
            init() {

                window.addEventListener('resize', this.onResize, false)

                this.scene = new THREE.Scene();

                // create a this.camera, which defines where we're looking at.
                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

                // create a render and set the size
                this.renderer = new THREE.WebGLRenderer();

                this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.shadowMapEnabled = true;

                // create the ground plane
                var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
                var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.receiveShadow = true;

                // rotate and position the plane
                plane.rotation.x = -0.5 * Math.PI;
                plane.position.x = 15;
                plane.position.y = 0;
                plane.position.z = 0;

                // add the plane to the this.scene
                this.scene.add(plane);

                var axes = new THREE.AxisHelper(20);
                this.scene.add(axes);

                // create a cube
                var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
                var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;

                // position the cube
                cube.position.x = -4;
                cube.position.y = 3;
                cube.position.z = 0;

                // add the cube to the this.scene
                this.scene.add(cube);

                var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
                var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
                var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

                // position the sphere
                sphere.position.x = 20;
                sphere.position.y = 0;
                sphere.position.z = 2;
                sphere.castShadow = true;

                // add the sphere to the this.scene
                this.scene.add(sphere);

                // position and point the this.camera to the center of the this.scene
                this.camera.position.x = -30;
                this.camera.position.y = 40;
                this.camera.position.z = 30;
                this.camera.lookAt(this.scene.position);

                // add subtle ambient lighting
                var ambientLight = new THREE.AmbientLight(0x0c0c0c);
                this.scene.add(ambientLight);

                var spotLight = new THREE.SpotLight(0xffffff);
                spotLight.position.set(-40, 60, -10);
                spotLight.castShadow = true;
                this.scene.add(spotLight);

                let step = 0

                let renderAnimation = () => {
                    stats.update()

                    cube.rotation.x += controls.rotationSpeed
                    cube.rotation.y += controls.rotationSpeed
                    cube.rotation.z += controls.rotationSpeed

                    step += controls.bouncingSpeed
                    sphere.position.x = 20 + (10 * (Math.cos(step)))
                    sphere.position.y = 2 + (10 * (Math.sin(step)))

                    requestAnimationFrame(renderAnimation)
                    this.renderer.render(this.scene, this.camera)
                }

                let controls = {rotationSpeed: 0.02, bouncingSpeed: 0.05}
                let gui = new dat.GUI();
                gui.add(controls, 'rotationSpeed', 0, 0.5)
                gui.add(controls, 'bouncingSpeed', 0, 0.5)

                // add the output of the this.renderer to the html element
                document.getElementById("app").appendChild(this.renderer.domElement)
                let stats = this.initState()

                // call the render function
                renderAnimation();
            },
            initState() {
                let stats = new Stats()
                stats.setMode(0)
                stats.domElement.style.position = 'absolute'
                stats.domElement.style.left = '0'
                stats.domElement.style.right = '0'
                document.getElementById('stats-output')
                    .appendChild(stats.domElement)
                return stats
            },
            onResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight
                this.camera.updateProjectionMatrix()
                this.renderer.setSize(window.innerWidth, window.innerHeight)
            }

        }
    }
</script>


<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        width: 100%;
        /*height:100%;*/
    }

    #stats-output {
        position:absolute;
        top:0;
        width:20%;
        height:50px;
    }
</style>
