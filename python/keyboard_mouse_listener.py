from pynput import keyboard, mouse
import sys
key_mapping = {
    keyboard.Key.f1: 'F1',
    keyboard.Key.f2: 'F2',
    keyboard.Key.f3: 'F3',
    keyboard.Key.f4: 'F4',
    keyboard.Key.f5: 'F5',
    keyboard.Key.f6: 'F6',
    keyboard.Key.f7: 'F7',
    keyboard.Key.f8: 'F8',
    keyboard.Key.f9: 'F9',
    keyboard.Key.f10: 'F10',
    keyboard.Key.f11: 'F11',
    keyboard.Key.f12: 'F12',
    keyboard.Key.esc: 'Escape',
    keyboard.Key.tab: 'Tab',
    keyboard.Key.enter: 'Enter',
    keyboard.Key.backspace: 'Backspace',
    keyboard.Key.caps_lock: 'CapsLock',
    keyboard.Key.shift_l: 'Shift',
    keyboard.Key.ctrl_l: 'Control',
    keyboard.Key.alt_l: 'Alt',
    keyboard.Key.space: ' ',
    keyboard.Key.cmd: 'Meta', 
}

def format_key(key):
    if isinstance(key, keyboard.Key): 
        return key_mapping.get(key, str(key)) 
    else:  
        return key.char  
    
def on_key_press(key):
    formatted_key = format_key(key)
    sys.stdout.write(f"keydown:{formatted_key}" + '\n') 
    sys.stdout.flush()  

def on_key_release(key):
    formatted_key = format_key(key)
    sys.stdout.write(f"keyup:{formatted_key}" + '\n') 
    sys.stdout.flush()

def on_click(x, y, button, pressed):
    if pressed:
        sys.stdout.write(f"MouseClicked:{button}" + '\n')
        sys.stdout.flush() 
    else:
        sys.stdout.write(f"MouseReleased:{button}" + '\n')
        sys.stdout.flush() 

def on_scroll(x, y, dx, dy):
    if dy > 0:
        sys.stdout.write("wheelUp" + '\n')
        sys.stdout.flush() 
    else:
        sys.stdout.write("wheelDown" + '\n')
        sys.stdout.flush() 


def start_listening():
    print("Starting to listen for keyboard and mouse events...", flush=True)

    keyboard_press_listener = keyboard.Listener(on_press=on_key_press)
    keyboard_release_listener = keyboard.Listener(on_release=on_key_release)
    mouse_click_listener = mouse.Listener(on_click=on_click)
    mouse_wheel_listener = mouse.Listener(on_scroll=on_scroll)


    keyboard_press_listener.start()
    keyboard_release_listener.start()
    mouse_click_listener.start()
    mouse_wheel_listener.start()

    keyboard_press_listener.join()
    keyboard_release_listener.join()
    mouse_click_listener.join()
    mouse_wheel_listener.join()
   

if __name__ == "__main__":
    start_listening()
