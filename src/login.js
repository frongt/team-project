// 로그인 버튼 클릭 이벤트 핸들러
document.getElementById('loginBtn').addEventListener('click', handleLogin);

// 로그인 처리 함수
async function handleLogin() {
    // 사용자가 입력한 아이디와 비밀번호 값을 가져옴
    const userId = document.getElementById('userIdInput').value;
    const password = document.getElementById('passwordInput').value;

    // 입력값 유효성 검사 (예시로 간단하게 길이만 검사)
    if (userId.length === 0 || password.length === 0) {
        await showLayer('alert', '아이디와 비밀번호를 입력해주세요.'); // layer로 메시지 표현
        return;
    }

    // 로그인 처리 로직 (예시로 간단하게 비밀번호가 'password'인 경우에만 로그인 성공 처리)
    if (userId === 'user123' && password === 'password') {
        // 서버로 전송할 데이터
        const data = {
            userId: userId,
            password: password
        };

        try {
            // fetch를 사용한 POST 요청
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await showLayer('success', '로그인에 성공했습니다.'); // layer로 메시지 표현
                // 로그인 성공 후 페이지 이동 등의 작업 수행
            } else {
                await showLayer('error', '아이디 또는 비밀번호가 일치하지 않습니다.'); // layer로 메시지 표현
            }
        } catch (error) {
            console.error('Error:', error);
            await showLayer('error', '로그인에 실패했습니다.'); // layer로 메시지 표현
        }
    } else {
        await showLayer('error', '아이디 또는 비밀번호가 일치하지 않습니다.'); // layer로 메시지 표현
    }
}

// layer 표시 함수
function showLayer(type, message) {
    return new Promise(resolve => {
        const layer = document.createElement('div');
        layer.className = 'layer';
        layer.textContent = message;

        if (type === 'success') {
            layer.style.backgroundColor = 'green';
        } else if (type === 'error') {
            layer.style.backgroundColor = 'red';
        } else {
            layer.style.backgroundColor = 'yellow';
        }

        document.body.appendChild(layer);

        setTimeout(() => {
            layer.remove();
            resolve();
        }, 3000);
    });
}
