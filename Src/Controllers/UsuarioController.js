import { ImagePicker } from 'expo';

export async function CambiarImagen() {
    return new Promise((resolve, reject) => {
        try {
            let result = ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                mediaTypes: 'Images'
            });
            if (!result.cancelled) {
                result.then(img => {
                    resolve(fetchImg(img));
                }).catch(() => {
                    reject({ message: 'Ha ocurrido un error vuelva a intentar' });
                })
            }
        } catch (error) {
            reject({ message: 'Ha ocurrido un error vuelva a intentar' });
        }
    })
}

function fetchImg(img) {
    return new Promise((resolve, reject) => {
        fetch(img.uri).then(res => {
            res.blob().then(blob => {
                resolve(SubirFoto(blob));
            }).catch(() => {
                reject({ message: 'Ha ocurrido un error vuelva a intentar' });
            })
        }).catch(() => {
            reject({ message: 'Ha ocurrido un error vuelva a intentar' });
        })
    })
}
