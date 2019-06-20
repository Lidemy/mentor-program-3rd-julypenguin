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
            WHERE username IN (SELECT username FROM julypenguin_users_certificate WHERE certificate_id = ?)";
  }

  private function sqlCheckPassword() {
    return "SELECT password  
            FROM julypenguin_users
            WHERE username = ?";
  }

  private function sqlCheckTotalPage() {
    return "SELECT * 
            FROM julypenguin_comments
            WHERE layer = 1 
            ORDER BY created_at DESC";
  }

  private function sqlCheckContent() {
    return "SELECT C.id, C.content, C.layer, C.parent_id, C.created_at, U.nickname, U.username,
            (SELECT count(T.comment_id)  
            FROM julypenguin_thumbsup T
            WHERE C.id = T.comment_id) countNum 
            FROM (SELECT * FROM julypenguin_comments WHERE layer = 1) C
            LEFT JOIN julypenguin_users U
            ON C.username = U.username
            ORDER BY created_at DESC LIMIT ?, ?";
  }

  private function sqlCheckSubContent() {
    return "SELECT C.id, C.content, C.layer, C.parent_id, C.created_at, U.nickname, U.username,
           (SELECT count(T.comment_id)  
            FROM julypenguin_thumbsup T
            WHERE C.id = T.comment_id) countNum 
            FROM julypenguin_comments C LEFT JOIN julypenguin_users U
            ON C.username = U.username
            ORDER BY created_at DESC";
  }

  private function sqlCheckAddThumbUp() {
    return "SELECT username
            FROM julypenguin_thumbsup
            WHERE comment_id = ?
            AND username = ?";
  }

  private function sqlCheckContentUsername() {
    return "SELECT username 
            FROM julypenguin_comments 
            WHERE id = ?";
  }

  private function sqlCheckUserInfo() {
    return "SELECT U.username, U.nickname, U.user_classification classification, COUNT(C.content) content 
            FROM julypenguin_users U LEFT JOIN julypenguin_comments C 
            ON U.username = C.username 
            GROUP BY U.username";
  }

  private function sqlInsertUsersInfo() {
    return "INSERT INTO julypenguin_users(username, password, nickname) 
            VALUE(?, ?, ?)";
  }
  
  private function sqlInsertUsersCertificate() {
    return "INSERT INTO julypenguin_users_certificate(username, certificate_id) 
            VALUE(?, ?)";
  }

  private function sqlInsertComments() {
    return "INSERT INTO julypenguin_comments(username, layer, parent_id, content) 
            VALUE(?, ?, ?, ?)";
  }

  private function sqlInsertThumbsUp() {
    return "INSERT INTO julypenguin_thumbsup(username, comment_id)
            VALUE (?, ?)";
  }

  private function sqlDeleteComment() {
    return "DELETE FROM julypenguin_comments 
            WHERE id = ?";
  }

  private function sqlDeleteThumbsUp() {
    return "DELETE FROM julypenguin_thumbsup
            WHERE comment_id = ?
            AND username = ?";
  }

  private function sqlDeleteCertificate() {
    return "DELETE FROM julypenguin_users_certificate 
            WHERE username = ?";
  }

  private function sqlUpdateContent() {
    return "UPDATE julypenguin_comments 
            SET content = ? 
            WHERE id = ?";
  }

  private function sqlUpdateAuthorization() {
    return "UPDATE julypenguin_users 
            SET user_classification = ? 
            WHERE username = ? ";
  }

  private function refValues($arr){
    if (strnatcmp(phpversion(),'5.3') >= 0) {
      $refs = array();
      foreach($arr as $key => $value)
        $refs[$key] = &$arr[$key];
      return $refs;
    }
    return $arr;
  }

  private function stmtExecute($sql, ...$args) {
    $stmt = $this->db->prepare($sql);
    call_user_func_array(array($stmt, 'bind_param'), self::refValues($args));
    $stmt->execute();
    return $stmt;
  }

  function checkUser() {
    $stmt = $this->stmtExecute($this->sqlCheckUser(), "s", $_COOKIE['member_id']);
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $this->username = $row['username'];
    $this->nickname = $row['nickname'];
    $this->classification = $row['class'];
    return $row;
  }

  function checkPassword($enterUsername) {
    $stmt = $this->stmtExecute($this->sqlCheckPassword(), "s", $enterUsername);
    $result = $stmt->get_result();
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
    return $this->stmtExecute($this->sqlCheckContent(), "ii", $this->pageSelect, $this->limit);
  }

  function checkSubContent() {
    return $this->db->query($this->sqlCheckSubContent());
  }

  function checkAddThumbUp($getCommentId) {
    return $this->stmtExecute($this->sqlCheckAddThumbUp(), "is", $getCommentId, $this->username);
  }

  function checkContentUsername($getId) {
    $stmt = $this->stmtExecute($this->sqlCheckContentUsername(), "i", $getId);
    return $stmt->get_result()->fetch_assoc()['username'];
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
    return $this->stmtExecute($this->sqlInsertUsersInfo(), "sss", $enterUsername, $enterPassword, $enterNickname);
  }

  function insertUsersCertificate($enterUsername, $getcertificateId) {
    return $this->stmtExecute($this->sqlInsertUsersCertificate(), "ss", $enterUsername, $getcertificateId);
  }

  function insertComments($enterUsername, $postlayer, $postparent_id, $enterContent) {
    return $this->stmtExecute($this->sqlInsertComments(), "siis", $enterUsername, $postlayer, $postparent_id, $enterContent);
  }

  function insertThumbsUp($getCommentId) {
    return $this->stmtExecute($this->sqlInsertThumbsUp(), "si", $this->username, $getCommentId);
  }

  function deleteComment($getId) {
    return $this->stmtExecute($this->sqlDeleteComment(), "i", $getId);
  }

  function deleteThumbsUp($getCommentId) {
    return $this->stmtExecute($this->sqlDeleteThumbsUp(), "is", $getCommentId, $this->username);
  }

  function deleteCertificate($getusername) {
    return $this->stmtExecute($this->sqlDeleteCertificate(), "s", $getusername);
  }

  function updateContent($postContent, $postId) {
    return $this->stmtExecute($this->sqlUpdateContent(), "ss", $postContent, $postId);
  }

  function updateAuthorization($postAuthority, $postUsername) {
    return $this->stmtExecute($this->sqlUpdateAuthorization(), "ss", $postAuthority, $postUsername);
  }
}





