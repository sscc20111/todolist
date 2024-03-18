import React, { useState } from 'react';
import { Figure } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const ImgApp = () => {
    const [currentFiles, setCurrentFiles] = useState([]); // 선택한 파일 목록을 상태에 저장합니다.

    const validFileType = (file) => {
        const fileTypes = [
            'image/apng',
            'image/bmp',
            'image/gif',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/webp',
            'image/x-icon',
        ];
        return fileTypes.includes(file.type);
    };

    const loadImg = (recentImageDataUrl) => {
        const imgIcon = document.querySelector('.imgicon');
        const imgBtn = document.querySelector('.profile__img');
        const imgFile = document.createElement('img');
        setCurrentFiles((prevFiles) => [
            ...prevFiles,
            { dataUrl: recentImageDataUrl, id: Date.now() },
        ]);
        
        if (imgIcon && imgBtn) { // 요소가 존재하는지 확인합니다.
            imgIcon.remove();
            imgBtn.appendChild(imgFile);
            imgFile.src = recentImageDataUrl;
        } else {
            console.error('Element not found'); // 요소를 찾을 수 없는 경우 에러를 기록합니다.
        }
    };

    const ImgChange = (event) => {
        const imgInput = event.target;
        const imgFiles = imgInput.files;

        if (imgFiles.length === 0) {
            alert('No files currently selected for upload');
        } else {
            for (const file of imgFiles) {
                if (validFileType(file)) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        localStorage.setItem('profile_img', reader.result);
                        loadImg(reader.result);
                    });
                    reader.readAsDataURL(file);
                } else {
                    alert('Not a valid file type. Update your selection.');
                }
            }
        }
    };

    const InputImg = () => {
        const imgInput = document.querySelector('.img-upload');
        imgInput.click();
    };

    return (
        <>
            <input type="file" accept="image/*" className="img-upload" onChange={ImgChange}></input>
            <Figure className='profile__img' onClick={InputImg}><FontAwesomeIcon icon={faUserPlus} className='imgicon' /></Figure>
        </>
    ) 
}

export default ImgApp;
