<?php
require_once('conn.php');

class Query {
  private $db;
  private $classification = '';
  public $nickname = '';
  public $username = '';
  public $password = '';
  
  public $limit = 20;
  public $dataNum = 0;
  public $pageIndex = 1;
  public $pages = 0;
  public $pageSelect = 0;
  public $prePage = 0;
  public $nextPage = 0;

  function __construct() {
  $this->db = new Db();
  $this->pageIndex = !isset($_GET['page']) ? 1 : intval($_GET['page']);
  $this->pageSelect = ($this->pageIndex - 1) * $this->limit;    
  }

  private function sqlCheckUser() {
    return "SELECT nickname, username, user_classification class 
            FROM julypenguin_users 
            WHERE username IN (SELECT username FROM julypenguin_users_certificate WHERE certificate_id = '$_COOKIE[member_id]')";
  }

  private function sqlCheckPassword($enterUsername) {
    return "SELECT password  
            FROM julypenguin_users
            WHERE username = '$enterUsername'";
  }

  private function sqlCheckTotalPage() {
    return "SELECT * 
            FROM julypenguin_comments 
            ORDER BY created_at DESC";
  }

  private function sqlCheckContent() {
    return "SELECT C.id, C.content, C.created_at, U.nickname, U.username 
            FROM julypenguin_comments C LEFT JOIN julypenguin_users U 
            ON C.username = U.username 
            ORDER BY created_at DESC LIMIT $this->pageSelect, $this->limit";
  }

  private function sqlCheckContentUsername($getId) {
    return "SELECT username 
            FROM julypenguin_comments 
            WHERE id = '$getId'";
  }

  private function sqlCheckUserInfo() {
    return "SELECT U.username, U.nickname, U.user_classification classification, COUNT(C.content) content 
            FROM julypenguin_users U LEFT JOIN julypenguin_comments C 
            ON U.username = C.username 
            GROUP BY U.username";
  }

  private function sqlInsertUsersInfo($enterUsername, $enterPassword, $enterNickname) {
    return "INSERT INTO julypenguin_users(username, password, nickname) 
            VALUE('$enterUsername', '$enterPassword', '$enterNickname')";
  }
  
  private function sqlInsertUsersCertificate($enterUsername, $getcertificateId) {
    return "INSERT INTO julypenguin_users_certificate(username, certificate_id) 
            VALUE('$enterUsername', '$getcertificateId')";
  }

  private function sqlInsertComments($enterUsername, $enterContent) {
    return "INSERT INTO julypenguin_comments(username, content) 
            VALUE('$enterUsername', '$enterContent')";
  }

  private function sqlDeleteComment($getId) {
    return "DELETE FROM julypenguin_comments 
            WHERE id = $getId";
  }

  private function sqlDeleteCertificate($getusername) {
    return "DELETE FROM julypenguin_users_certificate 
            WHERE username = '$getusername'";
  }

  private function sqlUpdateContent($postContent, $postId) {
    return "UPDATE julypenguin_comments 
            SET content = '$postContent' 
            WHERE id = $postId";
  }

  private function sqlUpdateAuthorization($postAuthority, $postUsername) {
    return "UPDATE julypenguin_users 
            SET user_classification = '$postAuthority' 
            WHERE username = '$postUsername' ";
  }

  function checkUser() {
    $result = $this->db->query($this->sqlCheckUser());
    $row = $result->fetch_assoc();
    $this->username = $row['username'];
    $this->nickname = $row['nickname'];
    $this->classification = $row['class'];
    return $row;
  }

  function checkPassword($enterUsername) {
    $result = $this->db->query($this->sqlCheckPassword($enterUsername));
    $row = $result->fetch_assoc();
    $this->password = $row['password'];
    return $result;
  }

  function checkPage() {
    $result = $this->db->query($this->sqlCheckTotalPage());
    $this->dataNum = $result->num_rows;
    $this->pages = ceil($this->dataNum/ $this->limit);   
    $this->prePage = $this->pageIndex - 1;
    $this->nextPage = $this->pageIndex + 1;
    return $result;
  }
  
  function checkContent() {
    return $this->db->query($this->sqlCheckContent());
  }

  function checkContentUsername($getId) {
    return $this->db->query($this->sqlCheckContentUsername($getId))->fetch_assoc()['username'];
  }

  function checkUserInfo() {
    return $this->db->query($this->sqlCheckUserInfo());
  }

  function checkAdmin() {
    return $this->classification === 'admin' || $this->classification === 'super_admin';
  }

  function checkSuperAdmin() {
    return $this->classification === 'super_admin';
  }

  function insertUsersInfo($enterUsername, $enterPassword, $enterNickname) {
    return $this->db->query($this->sqlInsertUsersInfo($enterUsername, $enterPassword, $enterNickname));
  }

  function insertUsersCertificate($enterUsername, $getcertificateId) {
    return $this->db->query($this->sqlInsertUsersCertificate($enterUsername, $getcertificateId));
  }

  function insertComments($enterUsername, $enterContent) {
    return $this->db->query($this->sqlInsertComments($enterUsername, $enterContent));
  }

  function deleteComment($getId) {
    return $this->db->query($this->sqlDeleteComment($getId));
  }

  function deleteCertificate($getusername) {
    return $this->db->query($this->sqlDeleteCertificate($getusername));
  }

  function updateContent($postContent, $postId) {
    return $this->db->query($this->sqlUpdateContent($postContent, $postId));
  }

  function updateAuthorization($postAuthority, $postUsername) {
    return $this->db->query($this->sqlUpdateAuthorization($postAuthority, $postUsername));
  }
}




