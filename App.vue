<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import * as THREE from 'three'

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
                let scene = new THREE.Scene()
                let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
                let renderer = new THREE.WebGLRenderer()
                renderer.setClearColor(0xEEEEEE, 1.0)
                renderer.setSize(window.innerWidth, window.innerHeight)
                renderer.shadowMap.enabled = true
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;//防止阴影马赛克

                let axes = new THREE.AxesHelper(20)
                scene.add(axes)

                let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
                let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});

                let plane = new THREE.Mesh(planeGeometry, planeMaterial)

                plane.rotation.x = -Math.PI >> 2
                plane.position.x = 15
                plane.position.y = 0
                plane.position.z = 0
                plane.receiveShadow = true;

                let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
                let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000})
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                cube.position.x = -4
                cube.position.y = 3
                cube.position.z = 0

                cube.castShadow = true;

                scene.add(cube)


                let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
                let sphereMaterial = new THREE.MeshLambertMaterial({
                    color: 0x7777ff,
                    // wireframe: true
                });
                let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

                sphere.position.x = 20
                sphere.position.y = 4
                sphere.position.z = 2
                scene.add(sphere)
                sphere.castShadow = true


                camera.position.x = -30
                camera.position.y = 40
                camera.position.z = 30
                camera.lookAt(scene.position)
                // Object.assign(plane, {position: {x: 15, y: 0, z: 0}})
                scene.add(plane)

                let spotLight = new THREE.SpotLight(0xffffff)
                spotLight.position.set(-40, 60, -10)
                spotLight.castShadow = true;
                scene.add(spotLight)

                document.getElementById('app').appendChild(renderer.domElement)
                renderer.render(scene, camera)
            }

            ,
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
    }
</style>
