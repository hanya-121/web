function includeHTML(){ // HTML파일을 다른 HTML 안에 불러오기 위한 함수 ajax
    // 여러 페이지에서 같은 내용(예: 메뉴, 푸터)을 중복 없이 관리하고 싶을 때 유용
    var z, i, elmnt, file, xhttp; // 변수선언만    
    z = document.getElementsByTagName("*")
    for(i = 0; i < z.length; i++){ // i는 가지고 있는만큼 반복
        elmnt = z[i]; // 변수 elmnt에 z개별을 대입
        file = elmnt.getAttribute("w3-include-html");
        // 모든 요소를 순회하면서 "w3-include-html" 속성 여부를 검사
        if (file){ // 만약 파일에 속성이 있다면, if (!=null) 만약 존재한다면
        xhttp = new XMLHttpRequest(); // 속성이 있다면 AJAX요청을 준비
        // XMLHttpRequest 웹에서 파일을 백그라운드로 불러오는 기술
        xhttp.onreadystatechange = function(){ 
            if(this.readyState == 4){ // 요청이 완료되면
            if(this.status == 200){ // 성공 시
                elmnt.innerHTML = this.responseText; 
            } 
            if(this.status == 404){ // 실패 시
                elmnt.innerHTML = "Page not found"
            } 
            elmnt.removeAttribute("w3-include-html")
            includeHTML(); 
            // 재귀 호출 : 함수는 호출 할 때만 실행되는 코드블럭/자기스스로 호출 > 재귀함수
            }
        }
        xhttp.open("GET", file, true); // 비동기 (true) 방식으로 
        xhttp.send();
        return; // 리턴으로 함수 종료하여 현재 요소만 처리
        }
    }
}