// Unity Academy 2D Simple Platformer Game Demo
//
// A and D: Walk left and right
// W: Jump
//

import {init_unity_academy_3d, init_unity_academy_2d, set_start, set_update,
    instantiate, delta_time, instantiate_sprite, same_gameobject, destroy,
    translate_world,get_key_down, get_key, get_key_up, get_position, copy_position,
    set_position, get_rotation_euler, set_rotation_euler, rotate_world,
    get_scale, set_scale, play_animator_state, add_impulse_force,
    apply_rigidbody, get_angular_velocity, get_mass, get_velocity,
    set_angular_velocity, set_mass, set_use_gravity ,set_velocity,
    on_collision_enter, on_collision_stay, on_collision_exit,
    get_main_camera_following_target } from "unity_academy";
    
    init_unity_academy_2d();
    
    //const mario = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario.png");
    const mario = instantiate_sprite("https://cdn.staticaly.com/gh/Tinisil/picx-images-hosting@master/pngwing.com.5k7kxxvccb00.webp");
    const ground = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const ground1 = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const ground2 = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const wall1 = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const wall2 = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const square1 = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    const slope = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mario_ground.png");
    //const mystery_box = instantiate_sprite("https://unity-academy.s3.ap-southeast-1.amazonaws.com/external_assets/mystery_box.png");
    const main_cam_target = get_main_camera_following_target();
    
    function start_player(gameObject){
        set_position(gameObject, -2, 2, 0);
        set_scale(gameObject, 0.5, 0.5, 1);
        apply_rigidbody(gameObject);
    }
    
    const start_ground = (gameObject) => set_position(gameObject, 0, -2, 0);
    const start_ground1 = (gameObject) => set_position(gameObject, 3, -1, 0);
    const start_ground2 = (gameObject) => set_position(gameObject, 6, 0, 0);
    
    const start_wall1 = (gameObject) => {
        set_position(gameObject, -6, 1.8, 0);
        set_rotation_euler(gameObject, 0, 0, 90);
    };
    const start_wall2 = (gameObject) => {
        set_position(gameObject, 8.75, 1.6, 0);
        set_rotation_euler(gameObject, 0, 0, 90);
    };
    const start_square1 = (gameObject) => {
        set_position(gameObject, -5, 1, 0);
        set_rotation_euler(gameObject, 0, 0, 90);
    };
    
    const start_slope = (gameObject) =>{
        set_position(gameObject, -4, -1, 0);
        set_rotation_euler(gameObject, 0, 0, -10);
    };
    
    function update_player(gameObject){
        
        const moveSpeed = 3;
        
        // Player: move and jump
        if(get_key("A")){
            translate_world(gameObject, -delta_time() * moveSpeed, 0, 0);
        }
        if(get_key("D")){
            translate_world(gameObject, delta_time() * moveSpeed, 0, 0);
        }
        if(get_key("W") && math_abs(get_velocity(gameObject)[1]) <= 0.05){
            add_impulse_force(gameObject, 0, 5, 0);
        }
    
        set_rotation_euler(gameObject, 0, 0, 0);
        
        copy_position(gameObject, main_cam_target, 0, 0, Infinity);
    }
    
    const moving_square = (gameObject) =>{
        
        translate_world(gameObject, delta_time(), 0, 0);
        set_rotation_euler(gameObject, 0, 0, 0);
        function moving_mario(mario){
            const deltaX = get_position(mario)[0]-get_position(gameObject)[0] ;
            // const deltaY = get_position(mario)[1]-get_position(gameObject)[1] ;
            if(deltaX > 0){
             translate_world(mario, -delta_time(), 0, 0);
            }
            else{
                translate_world(mario, delta_time(), 0, 0);
            }
        }
        if(get_position(mario)[1]-get_position(gameObject)[1] > 0.8 ){
                moving_mario(mario);
        }
        else{}
    };
    
    
    let mushroom = null;
    set_start(ground, start_ground);
    set_start(ground1, start_ground1);
    set_start(ground2, start_ground2);
    set_start(wall1, start_wall1);
    set_start(wall2, start_wall2);
    set_start(square1, start_square1);
    set_start(slope, start_slope);
    set_start(mario, start_player);
    set_update(mario, update_player);
    set_update(square1, moving_square);